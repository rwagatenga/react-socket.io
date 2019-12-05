import React, { Component } from 'react';
import FAChevronDown from 'react-icons/lib/md/keyboard-arrow-down'
import FAMenu from 'react-icons/lib/fa/list-ul'
import FASearch from 'react-icons/lib/fa/search'
//import MdEject from 'react-icons/lib/md/eject'
import FaPowerOff from "react-icons/lib/fa/power-off"
import {SideBarOption} from './SideBarOption'
import {get, last, differenceBy} from 'lodash'
import {createChatNameFromUsers} from '../../Factories'

export default class SideBar extends Component{
	static type = {
		CHATS:"chats",
		USERS:"users"
	}
	constructor(props){
		super(props);
		this.state={
		reciever:"",
		activeSideBar: SideBar.type.CHATS
		}
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		const {reciever} = this.state

		const {onSendPrivateMessage} = this.props
		//socket.emit(PRIVATE_MESSAGE, {reciever, sender:user.name})

		onSendPrivateMessage(reciever)

		this.setState({reciever:""})
	}

	addChatForUser = (username) => {
		this.props.onSendPrivateMessage(username)
		this.setActiveSideBar(SideBar.type.CHATS)
	}
	setActiveSideBar = (newSideBar)=>{
		this.setState({activeSideBar:newSideBar })
	}
	render(){
		const { chats, activeChat, user, setActiveChat, logout, users} = this.props
		const { reciever, activeSideBar } = this.state
		return (
			<div id="side-bar">
					<div className="heading">
						<div className="app-name">Our Cool Chat <FAChevronDown /></div>
						<div className="menu">
							<FAMenu />
						</div>
					</div>
					<form onSubmit={this.handleSubmit} className="search">
						<i className="search-icon"><FASearch /></i>
						<input 						
						placeholder="Search"
						type="text"
						value={reciever}
						onChange={(e)=>{this.setState({reciever:e.target.value}) }}
						/>
						<div className="plus"></div>
					</form>
					<div className="side-bar-select">
						<div
							
							onClick = { ()=>{this.setActiveSideBar(SideBar.type.CHATS) } } 
							className={`fred ${(activeSideBar === SideBar.type.CHATS) ? 'active': ''}`}>
							<span>Chats</span>
						</div>
						<div
							
							onClick = { ()=>{this.setActiveSideBar(SideBar.type.USERS) } } 
							className={	`fred ${(activeSideBar === SideBar.type.USERS) ? 'active': ''}`}>
							<span>Users</span>
						</div>
					</div>
					
					<div 
						className="users" 
						ref='users' 
						onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}>
						
						{
							activeSideBar === SideBar.type.CHATS ?
								chats.map((chat)=>{
									if (chat.name) {
										// const lastMessage = chat.messages[chat.messages.length - 1];
								// const chatSideName = chat.users.find((name)=>{
								// 	return name !== user.name
								// }) || "Community"
								// const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''
								
								return(
								// <div 
								// 	key={chat.id} 
								// 	className={`user ${classNames}`}
								// 	onClick={ ()=>{ setActiveChat(chat) } }
								// 	>
								// 	<div className="user-photo">{chatSideName[0].toUpperCase()}</div>
								// 	<div className="user-info">
								// 		<div className="name">{chatSideName}</div>
								// 		{lastMessage && <div className="last-message">{lastMessage.message}</div>}
								// 	</div>
									
								// </div>
								<SideBarOption
									key = {chat.id}
									name = {chat.isCommunity ? chat.name : createChatNameFromUsers(chat.users, user.name)}
									lastMessage = {get(last(chat.messages), 'message', '')}
									active = {activeChat.id === chat.id}
									onClick = {()=> {this.props.setActiveChat(chat)}}
								/>
							)
							}

							return null
						})
						:	
						// }
						// {
							differenceBy(users, [user], 'name').map((otherUser, index)=>{
								return (
										<SideBarOption
											key = {index}
											name = {otherUser.name}
											onClick = { ()=> {this.addChatForUser(otherUser.name) } }
										/>
									)
							})
						}
							
						
					</div>
					<div className="current-user">
						<span>{user.name}</span>
						<div onClick={()=>{logout()}} title="Logout" className="logout">
							{/*<MdEject/>	*/}
							<FaPowerOff/>
						</div>
					</div>
			</div>
		);
	
	}
}

import React from 'react'
import { Link } from 'react-router-dom'
import { menuConfig  } from '../utils/menuConfig'
import styles from './Navbar.scss'

export default class Navbar extends React.Component{
    constructor(props){
        super(props)
    }

    render(){

        return (
            <div className={ styles['navbar'] }>
                <div className={ styles['search'] }>
                    <input type="text" placeholder={`搜索...`} />
                </div>
                <div className={ styles['hr'] }></div>
                <div className={ styles['menu-list'] }>
                    {
                        menuConfig.map((item) => {
                            const active = location.pathname === item.url
                            return (
                                <div
                                    key={ item.url }
                                    className={ `${styles['menu-item']} ${active ? styles['active'] : ''}` }
                                >
                                    <div className={ styles['item']}>
                                        <Link to={ item.url }>{ item.name || '' }</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
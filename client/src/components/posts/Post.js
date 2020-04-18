import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import { config } from '../config/config'
import axios from 'axios'
import PostContainer from './PostContainer'

function Post() {
    const [listedPosts, setListedPosts] = useState([])

    useEffect(() => {
        const getPosts = async () => {
            const token = localStorage.getItem("jwt")
            await axios.get(`${config.backEnd}/api/posts/all`, {
                headers: { Authorization: token }
            }).then(response => {
                setListedPosts(response.data)
            }).catch(err => {
                console.log(err)
            })
        }

        getPosts()
    }, [])

    const showPosts = () => {
        return listedPosts.map(post => {
            return (
                <PostContainer key={post._id} post={post} />
            )
        })
    }

    return (
        <Container>
            <div className="wrapper__post">
                {showPosts()}
            </div>
        </Container>
    )
}


export default Post
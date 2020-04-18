import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import moment from 'moment'

function PostContainer({ post }) {
    let date = moment(post.postDate).format('HH:mm | DD/MM/YYYY')
    return (
        <Card className="text-center">
            <Card.Header ><h6>{post.user.userName}</h6></Card.Header>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Button variant="primary">Open post</Button>
            </Card.Body>
            <Card.Footer className="text-muted">{date}</Card.Footer>
        </Card>
    )
}

export default PostContainer
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Button } from 'semantic-ui-react';

export default function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted content='Welcome to Relex-Homework' />
                        <Button as={Link} to='/reviews' size='huge' inverted>
                            Go to Reviews!
                        </Button>
            </Container>
        </Segment>
    )
}
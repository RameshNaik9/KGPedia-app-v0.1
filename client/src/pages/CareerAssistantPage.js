import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ConvoHeader from '../components/ConvoHeader';  // Import the new header
import ChatDrawer from '../components/ChatDrawer';
import Assistant from '../components/Assistant';
import Conversation from '../components/Conversation';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import './CareerAssistantPage.css';

const CareerAssistantPage = () => {
    const { conversation_id } = useParams();
    const isMobile = useMediaQuery('(max-width: 576px)');
    const [drawerOpen, setDrawerOpen] = useState(!isMobile);
    const [newConversation, setNewConversation] = useState(null);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleNewConversation = (conversation) => {
        setNewConversation(conversation);
    };

    return (
        <div className="career-assistant-page">
            {/* Use ConvoHeader instead of Header */}
            <ConvoHeader 
                toggleDrawer={toggleDrawer} 
                isDrawerOpen={drawerOpen} 
                conversationId={conversation_id} 
            />
            <div className="career-assistant-container">
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer}
                    variant={isMobile ? 'temporary' : 'persistent'}
                    className="chat-drawer"
                    sx={{
                        width: 250,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 250,
                            top: '68px',
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    <ChatDrawer newConversation={newConversation} />
                </Drawer>
                <Box className="main-content">
                    {conversation_id ? (
                        <Conversation />
                    ) : (
                        <Assistant onNewConversation={handleNewConversation} />
                    )}
                </Box>
            </div>
        </div>
    );
};

export default CareerAssistantPage;

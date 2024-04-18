import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Button, Typography } from '@mui/material';

const Members = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('/api/members'); // Replace with your API endpoint
        setMembers(response.data.members);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  const handleEditMember = (memberId) => {
    // Implement edit functionality
    console.log('Edit member:', memberId);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Member List
      </Typography>
      <List>
        {members.map((member) => (
          <ListItem key={member.id}>
            <ListItemText primary={member.name} />
            <Button variant="outlined" onClick={() => handleEditMember(member.id)}>
              Edit
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Members;

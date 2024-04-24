import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, Button, Typography,   DialogContent,
  DialogTitle,
  Dialog,
  Slide, } from '@mui/material';

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { TransitionProps } from "@mui/material/transitions";


interface MembersProps {
  clubID: string | undefined,
  membersOpen: boolean;
  handleMembersOpen: () => void;
  handleMembersClose: () => void;
}

const slideTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Members = (props: MembersProps) => {
  const { clubID, membersOpen, handleMembersOpen, handleMembersClose } = props;

  const [members, setMembers] = useState([]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#7108d8",
      },
      secondary: {
        main: "#8B139C",
      },
    },
  });


  useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch(`/api/clubs/followers/${clubID}`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setMembers(data.members);
        console.log(data.members);
      }
    };

    fetchMembers();
  }, []);

  const handleEditMember = (memberId: any) => {
    // Implement edit functionality
    console.log('Edit member:', memberId);
  };

  // return (
  //   // <Container>
  //   //   {/* <Typography variant="h4" gutterBottom>
  //   //     Member List
  //   //   </Typography>
  //   //   <List>
  //   //     {members.map((member) => (
  //   //       <ListItem key={member.id}>
  //   //         <ListItemText primary={member.name} />
  //   //         <Button variant="outlined" onClick={() => handleEditMember(member.id)}>
  //   //           Edit
  //   //         </Button>
  //   //       </ListItem>
  //   //     ))}
  //   //   </List> */}
  //   // </Container>
  // );
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={membersOpen}
        onClose={handleMembersClose}
        TransitionComponent={slideTransition}
        fullWidth
        maxWidth={"sm"}
        PaperProps={{
          sx: {
            height: "600px",
            border: "2px #000 solid",
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle
          sx={{
            background:
              "linear-gradient(90deg, rgba(78,26,157,1) 0%, rgba(126,2,237,1) 99%)",
            border: "2px #000 solid",
            borderRadius: "15px",
          }}
        >
          <Container
            component="div"
            sx={{
              display: "flex",
              columnGap: 5,
              justifyContent: "center",
            }}
          >
            <Typography
              component="h3"
              variant="h3"
              fontFamily="RampartOne"
              color="white"
            >
              Members List
            </Typography>
          </Container>
        </DialogTitle>
        <DialogContent
          sx={{
            mt: 2,
            mb: 2,
            ml: 2,
            mr: 2,
            bgcolor: "primary.main",
            borderRadius: "20px",
          }}
        >


        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default Members;

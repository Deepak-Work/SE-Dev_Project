import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, Button, Typography,   DialogContent, Grid, Box, Link,
  DialogTitle,
  Dialog,
  Slide, } from '@mui/material';


import { useNavigate } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { TransitionProps } from "@mui/material/transitions";

import CustomPaletteOptions from "../UI/CustomPaletteOptions";



interface MembersProps {
  clubID: string | undefined,
  members: any[],
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
  const navigate = useNavigate();

  const { clubID, members, membersOpen, handleMembersOpen, handleMembersClose } = props;

  const theme = createTheme({
    palette: {
      primary: {
        main: "#7108d8",
      },
      secondary: {
        main: "#8B139C",
      },
      back: {
        main: "#ced4da",
        light: "#fff",
        dark: "#000",
        contrastText: "purple",
      },
    } as CustomPaletteOptions,
  });

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
            borderBottom:"4px solid",
            borderRadius: "15px 15px 0 0",
            // borderBottomLeftRadius:"0px",
            // borderBottomRightRadius:"0px",
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
            border:"2px solid",
            borderColor: "back.dark",
            borderRadius: "20px",
            overflow:"auto", "&::-webkit-scrollbar" : { display:"none"}
          }}
        >
  {members && members.length != 0 ? (
    <Grid
      container
      spacing={0}
      sx={{ display: "flex", justifyContent: "center",  }}
    >
      {members.map((member) => (
        <Grid
          item
          xs={12}
          sx={{
            padding: 2,
            margin: 2,
            display: "flex",
            backgroundColor: "back.main",
            border: "2px solid",
            borderColor:"back.dark",
            borderRadius: "20px",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Box
           component="img"
           alt="Club Logo"
           src={member.image}
            sx={{
              width: "50px",
              height: "50px",
              border: "2px solid black",
              borderRadius: "10px",
              display: { xs: "none", sm: "block", md: "block" },
            }}
          >
          </Box>
          <Box
            sx={{ display: "flex", flexFlow: "column wrap", justifyContent:"flex-start", px: 2 }}
          >
            <Box sx={{border:"0px black solid",  width: "13.5vw", maxWidth: "20vw"}}>
              <Link
                variant="h5"
                onClick={() => {
                  navigate(`/profile/${member.username}`)
                  window.location.reload();
                }
                  
                }
                sx={{
                  wordBreak: "break-word",
                  color: "back.dark",
                  cursor: "pointer",
                  "&:hover": { color: "primary.main" },
                }}
                underline="always"
                color="primary.main"
              >
                {member.username}
              </Link>

            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  ) : (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
      }}
    >
      <Typography
        component="h2"
        variant="h2"
        sx={{
          color: "back.light",
          fontFamily: "RampartOne",
          fontSize: "2rem",
        }}
      >
        No Members To Show...
      </Typography>
    </Box>
  )}

        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default Members;

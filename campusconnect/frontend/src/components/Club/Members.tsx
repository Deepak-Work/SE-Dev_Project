import {
  Container,
  Typography,
  DialogContent,
  Grid,
  Box,
  Link,
  DialogTitle,
  Dialog,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";

import theme from "../UI/theme";
import slideTransition from "../UI/slideTransition";

interface MembersProps {
  clubID: string | undefined;
  members: any[];
  membersOpen: boolean;
  handleMembersOpen: () => void;
  handleMembersClose: () => void;
}

const Members = (props: MembersProps) => {
  const navigate = useNavigate();

  const { members, membersOpen, handleMembersClose } = props;

  // const handleEditMember = (memberId: any) => {
  //   // Implement edit functionality
  //   console.log("Edit member:", memberId);
  // };

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
            borderBottom: "4px solid",
            borderRadius: "15px 15px 0 0",
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
              fontFamily="Rampart One"
              color="white"
            >
              Members List
            </Typography>
          </Container>
        </DialogTitle>
        <DialogContent
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box
            sx={{
              mt: "3%",
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              backgroundColor: "primary.main",
              border: "2px solid",
              borderColor: "back.dark",
              borderRadius: "20px",
              height: "95%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {members && members.length != 0 ? (
              <Grid
                container
                spacing={0}
                sx={{ display: "flex", justifyContent: "center" }}
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
                      borderColor: "back.dark",
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
                    ></Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexFlow: "column wrap",
                        justifyContent: "flex-start",
                        px: 2,
                      }}
                    >
                      <Box
                        sx={{
                          border: "0px black solid",
                          width: "13.5vw",
                          maxWidth: "20vw",
                        }}
                      >
                        <Link
                          variant="h5"
                          onClick={() => {
                            navigate(`/profile/${member.username}`);
                            window.location.reload();
                          }}
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
                  minHeight: "49vh",
                  display: "flex",
                  flexFlow: "column nowrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  component="h2"
                  variant="h2"
                  sx={{
                    alignSelf: "center",
                    color: "back.light",
                    fontFamily: "Rampart One",
                    fontSize: "2rem",
                  }}
                >
                  No Members To Show...
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default Members;

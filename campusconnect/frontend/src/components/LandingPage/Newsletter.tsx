import { Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Paper } from "@mui/material";

const Newsletter = () => {
  /*
     TODO: Get data from database to fill up newsletter content.
     If newsletter content is empty, then show message: "You are not following any clubs yet."
    */

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "15px",
        textAlign: "left",
        width: "500px",
        height: "250px",
      }}
    >
      <Typography
        variant="h5"
        color="#8300c4"
        fontWeight="bold"
        sx={{ pt: 3, pl: 3 }}
      >
        Newsletter
      </Typography>
      <Typography variant="h6" color="black" sx={{ pl: 3 }}>
        Here you will find the most recent posts from each club you follow.
      </Typography>
      {/* <List
          sx={{
            border: "1px solid #000000",
            borderRadius: "25px",
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            margin: "auto",
            boxShadow:
              "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
          }}
        >
          <Typography variant="h4" color="black">
            Here, you will find the most recent posts for all the clubs that you
            follow.
          </Typography>
          <ListItem>
            <Card
              sx={{
                minWidth: 320,
                border: "1px solid #000000",
                borderRadius: "25px",
                boxShadow:
                  "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
              }}
            >
              <CardContent>
                <Typography variant="h5" color="black">
                  Recent Post 1
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
          <ListItem>
            <Card
              sx={{
                minWidth: 320,
                border: "1px solid #000000",
                borderRadius: "25px",
                boxShadow:
                  "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
              }}
            >
              <CardContent>
                <Typography variant="h5" color="black">
                  Recent Post 2
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
          <ListItem>
            <Card
              sx={{
                minWidth: 320,
                border: "1px solid #000000",
                borderRadius: "25px",
                boxShadow:
                  "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
              }}
            >
              <CardContent>
                <Typography variant="h5" color="black">
                  Recent Post 3
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
        </List> */}
    </Paper>
  );
};

export default Newsletter;

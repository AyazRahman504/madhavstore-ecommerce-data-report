import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import useGithubAPI from "./useGithubAPI";
import Repos from "./Repos";
import styled from "styled-components";
import { red, green } from "@mui/material/colors";

function Issues() {
  const githubClient = useGithubAPI();
  const [issues, setIssues] = useState([]);
  const [repo, setRepo] = useState();
  const [error, setError] = useState();
  const [tab, setTab] = React.useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await githubClient.request(
          `GET /repos/AyazRahman290/${repo}/issues?state=all`,
          {
            owner: "AyazRahman290",
            repo: repo,
          }
        );
        setIssues(res.data.filter((i) => !!!i.pull_request));
        setError(null);
      } catch (error) {
        setIssues([]);
        setError(error.message);
      }
    }

    if (repo) {
      setIssues([]);
      fetchData();
    } else {
      setError("No Repository Selected");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repo]);

  const CustomTab = styled(Tabs)({
    "& .MuiTabs-indicator": {
      backgroundColor: tab ? red[800] : green[800],
    },
    "& .Mui-selected": {
      color: tab ? red[800] : green[800],
    },
  });
  return (
    <Box width={"100%"}>
      <Typography variant="h3">Issues</Typography> <Repos setRepo={setRepo} />
      {error ? (
        <Typography variant="h6" color={"error"} my={3}>
          {error}
        </Typography>
      ) : (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <CustomTab value={tab} onChange={(e, n) => setTab(n)}>
              <Tab label="Open" id="tab-1" />
              <Tab label="Closed" id="tab-2" />
            </CustomTab>
          </Box>
          <Box value={tab} role="tabpanel" id="tabPanel-0" hidden={tab !== 0}>
            <List>
              {issues
                .filter((i) => i.state === "open")
                .map((issue) => (
                  <>
                    <ListItem key={issue.id}>
                      <ListItemText
                        primary={issue.title}
                        secondary={issue.body}
                      />
                    </ListItem>
                    <Divider />
                  </>
                ))}
            </List>
          </Box>
          <Box value={tab} role="tabpanel" id="tabPanel-1" hidden={tab !== 1}>
            <List>
              {issues
                .filter((i) => i.state === "closed")
                .map((issue) => (
                  <>
                    <ListItem key={issue.id}>
                      <ListItemText
                        primary={issue.title}
                        secondary={issue.body}
                      />
                    </ListItem>
                    <Divider />
                  </>
                ))}
            </List>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Issues;

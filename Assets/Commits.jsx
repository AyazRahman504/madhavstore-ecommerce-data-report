import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  Chip,
} from "@mui/material";
import { format } from "date-fns";
import useGithubAPI from "./useGithubAPI";
import Repos from "./Repos";

const Commits = () => {
  const githubClient = useGithubAPI();
  const [commits, setCommits] = useState([]);
  const [repo, setRepo] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await githubClient.request(
          `GET /repos/AyazRahman290/${repo}/commits`,
          {
            owner: "AyazRahman290",
            repo: repo,
          }
        );
        setCommits(res.data);
        setError(null);
      } catch (error) {
        setCommits([]);
        setError(error.message);
      }
    }

    if (repo) {
      setCommits([]);
      fetchData();
    } else {
      setError("No Repository Selected");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repo]);

  return (
    <Box width={"100%"}>
      <Typography variant="h3">Commits</Typography>
      <Repos setRepo={setRepo} />
      {error ? (
        <Typography variant="h6" color={"error"} my={3}>
          {error}
        </Typography>
      ) : (
        <List>
          {commits.map((commit) => (
            <>
              <ListItem key={commit.id}>
                <ListItemText
                  primary={commit.commit.message}
                  secondary={`By ${commit.commit.author.name}`}
                />
                <ListItemSecondaryAction>
                  <Chip
                    label={format(
                      new Date(commit.commit.author.date),
                      "dd MMM yyy HH:mm"
                    )}
                    size="small"
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Commits;
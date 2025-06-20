import React, { useEffect, useState } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import useGithubAPI from "./useGithubAPI";

const Repos = ({ setRepo }) => {
  const githubClient = useGithubAPI();
  const [repos, setRepos] = useState([]);
  const handleSelect = (e) => {
    setRepo?.(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await githubClient.request("GET /users/AyazRahman290/repos", {
        username: "AyazRahman290",
      });
      setRepos(res.data);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormControl sx={{ mt: 2, minWidth: 120 }} size="small">
      <InputLabel id="repo-select-label">Repository</InputLabel>
      <Select
        labelId="repo-select-label"
        id="repo-select"
        label="Repository"
        onChange={handleSelect}
      >
        {repos.map((r) => (
          <MenuItem value={r.name}>{r.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Repos;

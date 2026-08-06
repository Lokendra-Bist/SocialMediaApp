import { useState } from "react";
import { fetchFollowers, fetchFollowing } from "../services/FollowService";

export const useFollowers = () => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [followersPage, setFollowersPage] = useState(0);
  const [followingPage, setFollowingPage] = useState(0);

  const [followersHasMore, setFollowersHasMore] = useState(true);
  const [followingHasMore, setFollowingHasMore] = useState(true);

  const loadFollowers = async () => {
    const page = await fetchFollowers(0);

    setFollowers(page.data.content);
    setFollowersPage(0);
    setFollowersHasMore(!page.data.last);
  };

  const loadFollowing = async () => {
    const page = await fetchFollowing(0);

    setFollowing(page.data.content);
    setFollowingPage(0);
    setFollowingHasMore(!page.data.last);
  };

  const loadMoreFollowers = async () => {
    if (!followersHasMore) return;

    const nextPage = followersPage + 1;

    const page = await fetchFollowers(nextPage);

    setFollowers((prev) => [...prev, ...page.data.content]);

    setFollowersPage(nextPage);
    setFollowersHasMore(!page.data.last);
  };

  const loadMoreFollowing = async () => {
    if (!followingHasMore) return;

    const nextPage = followingPage + 1;

    const page = await fetchFollowing(nextPage);

    setFollowing((prev) => [...prev, ...page.data.content]);

    setFollowingPage(nextPage);
    setFollowingHasMore(!page.data.last);
  };

  return {
    followers,
    following,

    loadFollowers,
    loadFollowing,

    loadMoreFollowers,
    loadMoreFollowing,

    followersHasMore,
    followingHasMore,
  };
};

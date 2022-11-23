import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user";

export default function MyAccount() {
  const user = useSelector(selectUser);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router;
    }
  }, [third]);

  return <div>myaccount</div>;
}

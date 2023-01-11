export const getUserSession = async (userEmail, userName) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/user/userEmail/${userEmail}`
    );
    const session = await response.json();
    //console.log(session, "session response");
    if (session === null) {
      try {
        (async () => {
          const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //how to specify the json to body?
            body: JSON.stringify({
              name: "neznam",
              username: "userName",
              email: userEmail,
              password: process.env.NEXT_PUBLIC_USER_DEFAULT_PASS,
            }),
          };

          await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signup`,
            options
          )
            .then((res) => res.json())
            .then((data) => {
              //if (data) router.push(process.env.NEXT_PUBLIC_APP_URL);
            });
        })();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/user/userEmail/${userEmail}`
        );
        const session = await response.json();
        return { session };
      } catch (error) {
        console.log(error);
      }
    } else {
      return { session };
    }
  } catch (error) {
    return error;
  }
};

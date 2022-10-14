import { Input } from "@chakra-ui/react";
import * as React from "react";

export default function RegisterForm() {
	const [mail, setMail] = React.useState("");
	const [username, setUsername] = React.useState("");
	// const userInfo = { mail: mail, username: username };

	async function handleRegister(): Promise<{ user: string }> {
		const userInfo = { mail: mail, username: username };
		const fetcher = await fetch("http://localhost:3000/api/register", {
			headers: {
				"Content-type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(userInfo),
		});
		const newUser : {user : string} = await fetcher.json();

    if (newUser) {
      window.alert("You have succesfully been registered. You can no proceed to login. Thank you for your trust!")
    }

		return newUser;
	}

	return (
    <main className="auth-wrapper">
      <header className="auth-header">
        <h1>Memoriez</h1>
        <a href="/login">Login</a>
      </header>

      <div className="auth-body">
        <div className="auth-left">
          <h2>Other component</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            fringilla quam sit amet nulla ullamcorper, eleifend commodo ligula
            finibus. Sed dictum auctor nisi a posuere. Donec id nibh sed tortor
            tempus hendrerit. Curabitur quis leo ultrices, pharetra libero non,
            tincidunt orci. In ut consectetur libero, vel scelerisque mi. Nullam
            vulputate erat odio, quis egestas libero molestie sed. Proin nec ex
            nisl. Fusce ullamcorper tortor in risus porttitor eleifend. Nunc
            diam velit, varius quis elit quis, volutpat ornare odio. Aenean ac
            neque vitae felis lobortis tempor vitae non nunc. Curabitur nibh
            lacus, mollis dictum congue eu, consequat in lacus. Sed et sapien
            ex. Aenean pellentesque sem et erat vehicula feugiat. Proin id
            fermentum nisi, nec congue elit. Morbi vestibulum scelerisque
            tortor, sit amet ornare odio venenatis ac. Etiam dictum eros feugiat
            nulla dignissim maximus.
          </p>
        </div>

        <div className="auth-middle"></div>

        <div className="auth-right">
          <section className="auth-section-right">

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleRegister();
              }}
            >
              <div>
                <Input
                  variant="altered-flush"
                  placeholder="Username..."
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <Input
                  variant="altered-flush"
                  placeholder="Mail..."
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>

              <div className="auth-button-wrapper">
                <input
                  type="submit"
                  value="Register"
                  className="auth-button"
                ></input>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

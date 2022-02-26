import { Link } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import * as React from "react";
import { personData } from "../person.details";

export interface userData {
  memory: string[];
  user: {
    circle: personData[];
    _id: string;
    username: string;
    mail: string;
  };
  _id: string;
}

export default function SideNav() {
  const [user, setUser] = React.useState<null | userData>();
  const navigate = useNavigate();

  //let { id } = useParams();
  let id = "62090860481ca44282afbe08";

  async function getProfileInfos(id: any) {
    const fetcher = await fetch(`http://localhost:3000/api/dashboard/${id}`, {
      method: "GET",
    });
    const data: userData = await fetcher.json();
    setUser(data);
    return data;
  }

  React.useEffect(() => {
    getProfileInfos(id);
  }, [id]);

  return (
    <>
      <nav className="column-items">
        <div>
          <Link href="/">
            <h4>Dashboard</h4>
          </Link>
          <Link>
            <h4>Favorites</h4>
          </Link>
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Link>
                    <h4>My circle</h4>
                  </Link>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              {user?.user.circle.map((elm) => {
                return (
                  <AccordionPanel pb={4}>
                    <Link>
                      <button
                        onClick={() => {
                          navigate(`/person-details/${elm._id}`);
                        }}
                      >
                        <h4>{elm.name}</h4>
                      </button>
                    </Link>
                  </AccordionPanel>
                );
              })}
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          <Link>
            <h4>Help</h4>
          </Link>
          <Link>
            <h4>Logout</h4>
          </Link>
        </div>
      </nav>
    </>
  );
}

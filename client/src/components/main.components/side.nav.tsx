import { Link } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export default function SideNav() {
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
              <AccordionPanel pb={4}>
                <Link>
                  <h4>Name 1</h4>
                </Link>
              </AccordionPanel>
              <AccordionPanel pb={4}>
                <Link>
                  <h4>Name 2</h4>
                </Link>
              </AccordionPanel>
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

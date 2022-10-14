import { useDisclosure } from "@chakra-ui/react";
import Header from "./header";
import SideNav from "./side.nav";
import AddMemoryForm from "../AddMemoryForm";
import { ReactNode } from "react";
import { Input } from "@chakra-ui/react";
import React from "react";
import InGridRoutes from "../../InGridRoutes";

interface Props {
  children?: ReactNode;
}

export default function GridLayout({ children }: Props) {
  const user = JSON.parse(localStorage.userId);
  const url = window.location.pathname;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchKey, setSearchKey] = React.useState("");

  return (
    <>
      <div className="grid-container">
        <SideNav />
        <div className="grid-sub-container">
          <div className="header-container">
            <div className="header-grid-container">
              <div>
                <Header />
              </div>
              <div className="button-search-parent">
                <button
                  className="button-light"
                  onClick={() => {
                    onOpen();
                  }}
                >
                  Add memory
                </button>
                <AddMemoryForm isOpen={isOpen} onClose={onClose} />
                <p>{searchKey}</p>
                <Input
                  value={searchKey}
                  onChange={(e) => {
                    setSearchKey(e.target.value);
                  }}
                  className="search-bar"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <div>{<InGridRoutes searchKey={searchKey} />}</div>
        </div>
      </div>
    </>
  );
}

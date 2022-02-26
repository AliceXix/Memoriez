import { Input } from "@chakra-ui/react";

export default function Header() {
  return (
    <>
      <div className="row-items">
        <h1>Memoriez</h1>
        <Input placeholder="Search" />
        <h1>your name</h1>
      </div>
    </>
  );
}

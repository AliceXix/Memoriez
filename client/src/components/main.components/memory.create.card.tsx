import {
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react'

import { Formik, Form, Field} from 'formik'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { unset } from 'lodash';


export default function MemoryCreateCard() {

  return (
    <>
      <Formik
        initialValues={{ memory: "write your memory here" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            <section className="row-items">
              <div>
                <Menu>
                  <MenuButton as={Button} rightIcon="v" margin={"unset"}>
                    person related to
                  </MenuButton>
                  <MenuList>
                    <MenuItem>name 1</MenuItem>
                    <MenuItem>name 2</MenuItem>
                  </MenuList>
                </Menu>
              </div>
              <div>
                <Field
                  name="name"
                  width={"100%"}
                >
                  {({ field }: { field: any }) => (
                    <FormControl>
                      <FormLabel htmlFor="memory" margin={"unset"}></FormLabel>
                      <Input {...field} id="memory" placeholder="memory"/>
                    </FormControl>
                  )}
                </Field>
              </div>
              <div>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                  margin={"unset"}
                >
                  Submit
                </Button>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </>
  );
};
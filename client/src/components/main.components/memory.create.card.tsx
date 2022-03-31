import {
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react'

import { Formik, Form, Field} from 'formik'

import * as React from "react";
import { useParams } from "react-router-dom";


export default function MemoryCreateCard() {
    const [title, setTitle] = React.useState("");
    const [text, setText] = React.useState("");
    const userInput: { title: string; text: string } = {
      title: title,
      text: text,
    };

    let { id } = useParams();

    async function addMemory(id: any, input: any) {
      const fetcher = await fetch(
        `http://localhost:3000/api/add-memory/${id}`,
        {
          headers: {
            "Content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(input),
        }
      );

      return await fetcher.json();
    }

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
          <Form
            onSubmit={async (e) => {
              e.preventDefault();
              await addMemory(id, userInput);
            }}
          >
            <section className="row-items">
              <div>
                <Field name="name" width={"100%"}>
                  {({ field }: { field: any }) => (
                    <FormControl>
                      <FormLabel
                        htmlFor="title"
                        margin={"unset"}
                      ></FormLabel>
                      <Input {...field} id="title" placeholder="title" />
                      <FormLabel htmlFor="text" margin={"unset"}></FormLabel>
                      <Input {...field} id="text" placeholder="memory" />
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
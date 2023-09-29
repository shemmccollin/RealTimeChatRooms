import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useSubmit } from "react-router-dom";
import { MutableRefObject, useEffect, useRef } from "react";

function SearchBar({ query }: any) {
  const submit = useSubmit();
  const value = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    value.current.value = query;
  }, [query]);

  const onChange = (e: any) => {
    const isFirstSearch = query == null;
    submit(e.currentTarget.form, { replace: !isFirstSearch });
  };

  return (
    <>
      <Form id="search-Form" role="search">
        <FloatingLabel
          controlId="SearchInput"
          label="Search for a Channel"
          className="mb-3"
        >
          <input
            className="form-control"
            ref={value}
            type="search"
            name="query"
            placeholder="Search for a Channel"
            defaultValue={query}
            onChange={onChange}
          />
        </FloatingLabel>
      </Form>
    </>
  );
}

export default SearchBar;

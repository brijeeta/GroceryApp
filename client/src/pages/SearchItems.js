import React, { useState, useEffect } from "react";
import {
    Jumbotron,
    Container,
    Col,
    Form,
    Button,
    Card,
    CardColumns,
} from "react-bootstrap";
import { saveProductIds, getSavedProductIds } from "../utils/localStorage";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { SAVE_PRODUCT } from "../utils/mutations";
import { GET_ME, KROGER_SEARCH } from "../utils/queries";

const SearchItems = () => {
    const [saveProduct] = useMutation(SAVE_PRODUCT);
    const [searchInput, setSearchInput] = useState("");
    const { loading, data } = useQuery(KROGER_SEARCH, {
        variables: {term: searchInput}
    });
    const searchedItems = data?.krogerSearch || [];
    const [savedProductIds, setSavedProductIds] = useState(getSavedProductIds());

    useEffect(() => {
        return () => saveProductIds(savedProductIds);
    });


    // create method to search for items and set state on form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {

            setSearchInput('');

        } catch (err) {
            console.error(err);
        }
    };


    return (
        <>
            <Jumbotron fluid className="text-light bg-dark">
                <Container>
                    <h3>Enjoy shopping with Kroger!!</h3>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Row>
                            <Col xs={12} md={5}>
                                <Form.Control
                                    name="searchInput"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type="text"
                                    size="lg"
                                    placeholder="Search for an item"
                                />
                            </Col>
                            <Col xs={12} md={5}>
                                <Button type="submit" variant="success" size="lg">
                                    Submit Search
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </Jumbotron>

            <Container>
                <h5>
                    {searchedItems.length
                        ? `Viewing ${searchedItems.length} results:`
                        : "Search for an item to begin"}
                </h5>
            </Container>
        </>
    );
};

export default SearchItems;

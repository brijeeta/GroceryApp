import React, { useState } from "react";
import {
    Jumbotron,
    Container,
    Col,
    Form,
    Button,
    Card,
    CardColumns,
} from "react-bootstrap";
import { searchKroger } from "../utils/API";

const SearchItems = () => {
    // create state for holding returned google api data
    const [searchedItems, setSearchedItems] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState("");


    // create method to search for items and set state on form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await searchKroger(searchInput);

            if (!response.ok) {
                throw new Error("something went wrong!");
            }

            const { items } = await response.json();
            console.log(items);
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

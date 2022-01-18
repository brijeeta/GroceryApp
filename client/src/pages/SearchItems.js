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
import { KROGER_SEARCH } from "../utils/queries";

import Auth from "../utils/auth";

const SearchItems = () => {
    // create state for holding returned kroger api data

    const [searchInput, setSearchInput] = useState("");
    const { loading, data } = useQuery(KROGER_SEARCH, {
        variables: { term: searchInput }
    });
    const searchedItems = data?.krogerSearch || [];
    //console.log(data);

    const [savedProductIds, setSavedProductIds] = useState(getSavedProductIds());

    useEffect(() => {
        return () => saveProductIds(savedProductIds);
    });


    const [saveProduct, { error }] = useMutation(SAVE_PRODUCT);

    // create function to handle saving a book to our database
    const handleSaveProduct = async (productId) => {
        // find the book in `searchedBooks` state by the matching id
        const productToSave = searchInput.find((item) => item.productId === productId);

        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await saveProduct({
                variables: {
                    input: productToSave,
                },
            });

            if (!response) {
                throw new Error("something went wrong!");
            }

            // if product successfully saves to user's account, save book id to state
            setSavedProductIds([...savedProductIds, productToSave.productId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Jumbotron fluid className="text-light bg-dark">
                <Container>
                    <h3>Enjoy shopping with Kroger!!</h3>
                    <Form>
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
                                {/* <Button type="submit" variant="success" size="lg">
                                    Submit Search
                                </Button> */}
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
                <CardColumns>
                    {searchedItems.map((item) => {
                        return (
                            <Card key={item.productId} border="dark">
                                {item.image ? (
                                    <Card.Img
                                        src={item.image}
                                        alt={`The cover for ${item.description}`}
                                        variant="top"
                                    />
                                ) : null}
                                <Card.Body>
                                    {/* <Card.Title>{item.productId}</Card.Title> */}
                                    <Card.Title>{item.description}</Card.Title>
                                    {Auth.loggedIn() && (
                                        <Button
                                            disabled={savedProductIds?.some(
                                                (savedProductId) => savedProductId === item.productId
                                            )}
                                            className="btn-block btn-info"
                                            onClick={() => handleSaveProduct(item.productId)}
                                        >
                                            {savedProductIds?.some(
                                                (savedProductId) => savedProductId === item.productId
                                            )
                                                ? "This product has already been saved!"
                                                : "Add to Cart"}
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    );
};

export default SearchItems;

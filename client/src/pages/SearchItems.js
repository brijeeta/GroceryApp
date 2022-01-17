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
import Auth from '../utils/auth';
import { getDescription } from "graphql";

const SearchItems = () => {
    const [saveProduct] = useMutation(SAVE_PRODUCT);
    const [searchInput, setSearchInput] = useState("");
    const [searchedItems, setSearchedItems] = useState([]);
    //const searchedItems = data?.krogerSearch || [];
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
            const response = await useQuery(KROGER_SEARCH, {
                variables: {term: searchInput}
            });
            setSearchInput('');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const { items } = await response.json();

            const groceryItems = items.map((item) => ({
                productId: item.productId,
                description: item.description || '',
                category: item.category || '',
                image: item.image || '',
            }));

            setSearchedItems(groceryItems);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
        

    };

    const handleSaveItem = async (itemId) => {

        const itemToSave = searchedItems.find((item) => item.productId === itemId);
        
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {

            const {data} = await saveProduct({
                variables: { input: itemToSave }
            });

            setSavedProductIds([...savedProductIds, itemToSave.productId]);
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
                <CardColumns>
                    {searchedItems.map((item) => {
                        return (
                            <Card key={item.productId} border='dark'>
                                {item.image ? (
                                    <Card.Img src={item.image} alt={`The image for ${item.description}`} variant='top' />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{item.description}</Card.Title>
                                    <Button
                                        disabled={saveProductIds?.som((savedItemId) => savedItemId === item.productId)}
                                        className='btn-block btn-info'
                                        onClisk={() => handleSaveItem(item.productId)}>
                                        {savedProductIds?.some((savedItemId) => savedItemId === item.productId)
                                            ? 'This item has already been saved!'
                                            : 'Save this Item!'}
                                        </Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </CardColumns>
            </Container>
        </>
    );
};

export default SearchItems;

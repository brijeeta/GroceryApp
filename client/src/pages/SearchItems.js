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
import Auth from '../utils/auth';
import { saveProductIds, getSavedProductIds } from "../utils/localStorage";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { SAVE_PRODUCT } from "../utils/mutations";
import { GET_ME, KROGER_SEARCH } from "../utils/queries";
import { searchSpoon } from "../utils/API";


const SearchItems = () => {
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [searchInput, setSearchInput] = useState ('');
    const [SavedProducts, setSavedProducts] = useState(getSavedProductIds());
    const [saveProduct, {error}] = useMutation(SAVE_PRODUCT);

    useEffect(() =>{
        return () => saveProductIds(SavedProducts);
    });

    const handleFormSubmit = async (event) => {
        console.log('fired');
        event.preventDefault();
        
        if (!searchInput) {
            return false;
        }

        try {
            const response = await searchSpoon(searchInput);

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const {items} = await response.json();
            console.log(items);
            const productData = items.products.map((item) => ({
                productId: item.id,
                name: item.title,
                image: item.image || '',
            }));

            setSearchedProducts(productData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveItem = async (itemId) => {
        const itemToSave = searchedProducts.find((item) => item.productId === itemId);
        
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const {data} = await saveProduct({
                variables: {input: itemToSave}
            })
            setSavedProducts([...SavedProducts, itemToSave.productId]);
        } catch (err) {
            console.error(err);
        }
    };

 
// const SearchItems = () => {
//     const [searchedItems, setSearchedItems] = useState([]);
//     const [saveProduct] = useMutation(SAVE_PRODUCT);
//     const [searchInput, setSearchInput] = useState("");
//     const { loading, data } = useQuery(KROGER_SEARCH, {
//         variables: {term: searchInput}
//     });
//     const {items} = data?.krogerSearch || {};
    //console.log(items);
    // const itemData = items.map((item) => ({
    //     itemId: item.productId,
    //     category: item.categories[0] || 'No Category',
    //     description: item.description || 'No Description',
    //     image: item.images[0].sizes[1] || '',
    // }));
    // console.log(itemData);
    // setSearchedItems(itemData);

    // setSearchInput('');

    //const [savedProductIds, setSavedProductIds] = useState(getSavedProductIds());
    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();

    // if(!searchInput) {
    //     return false;
    // }

    // try {
    //     const response = await searchSpoon(searchInput);

    //     if (!response.ok) {
    //         throw new Error('something went wrong');
    //     }

    //     const { items } = await response.json();
    //     console.log(items);
    //     const itemData = items.map((item) => ({
    //         item
    //     }))
    // } catch (err) {
    //     console.error(err);
    // }

    // };
    // useEffect(() => {
    //     return () => saveProductIds(savedProductIds);
    // });


    // create method to search for items and set state on form submit
    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();

    //     if (!searchInput) {
    //         return false;
    //     }

    //     try {

    //         setSearchInput('');

    //     } catch (err) {
    //         console.error(err);
    //     }
    // };


    return (
        <>
            <Jumbotron fluid className="text-light bg-dark">
                <Container>
                    <h3>Enjoy shopping with Kroger!!</h3>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                name='searchInput'
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type='text'
                                size='lg'
                                placeholder='Search for a book'
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button type='submit' variant='success' size='lg'>
                                Submit Search
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </Jumbotron>

            <Container>
                <h5>
                    {searchedProducts.length
                        ? `Viewing ${searchedProducts.length} results:`
                        : "Search for an item to begin"}

                </h5>
                <CardColumns>
                    {searchedProducts.map((item) => {
                        return (
                            <Card key={item.itemId} border='dark'>
                                {item.image ? (
                                    <Card.Img src={item.image} alt={'Item Image'} variant='top' />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    {Auth.loggedIn() && (
                                        <Button
                                            disabled = {SavedProducts?.some((savedProductId) => SavedProducts === item.productId)}
                                            className='btn-block btn-info'
                                            onClick={() => handleSaveItem(item.productId)}>
                                                {SavedProducts?.some((savedProductId) => SavedProducts === item.productId)
                                                ? 'This item is already saved!'
                                                : 'Save this item!'}
                                            </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        )
                    }

                    )}
                </CardColumns>
            </Container>
        </>
    );
};


export default SearchItems;

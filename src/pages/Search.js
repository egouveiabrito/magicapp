import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, Animated, FlatList } from 'react-native';


var styles = require('../pages/styles');
import LazyImage from '../components/LazyImage';
import api from '../services/api';
import { Post, Header, Avatar, Name, Description } from '../components/Search/styled';


const { width } = Dimensions.get("window");
const PADDING = 16;
const SEARCH_FULL_WIDTH = width - PADDING * 2; //search_width when unfocused
const SEARCH_SHRINK_WIDTH = width - PADDING - 90; //search_width when focused
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);


export default function Search() {
    
        const [docs, setDocs] = useState([]);
        const [page, setPage] = useState(1);
        const [total, setTotal] = useState(0);
        const [viewable, setViewable] = useState([]);
        const [loading, setLoading] = useState(false);
        const [refreshing, setRefreshing] = useState(false);
        const [inputLength] = useState(new Animated.Value(SEARCH_FULL_WIDTH));
        const [cancelPosition] = useState(new Animated.Value(SEARCH_FULL_WIDTH));
        const [opacity] = useState(new Animated.Value(0));
        const [searchBarFocused] = useState(false);

        useEffect(() => { loadPage() }, []);

        function validadeJson(Info){

        if(docs.length > 500) return;
            
        try {
            var Cards = new Array();
            for (let index = 0; index < Info.data.length; index++) {
                Cards.push( {
                    _id: Info.data[index].id,
                    title: Info.data[index].name + ' - ' + Info.data[index].type_line,
                    url: Info.data[index].image_uris == undefined ? 'https://www.buritama.sp.leg.br/imagens/parlamentares-2013-2016/sem-foto.jpg/image' :
                        Info.data[index].image_uris.normal,
                    description: Info.data[index].oracle_text
                });
            }

            return Cards;

        } catch (error) {
            console.log(error);
        }
        }

        async function loadPage(pageNumber = page, shouldRefresh = false) {

            if (pageNumber === total) return;
            if (loading) return;

            setLoading(true);

            try {
                const response = await api.get('/cards?page=' + page);
                const data = validadeJson(response.data);
                
                setLoading(false);
                setTotal(Math.floor(data.length / 4));
                setPage(pageNumber + 1);
                setDocs(shouldRefresh ? data : [...docs, ...data]);

            } catch (error) {
                console.log(error.message);
            }
        }

        async function search(search) {
            
            if (search.length <= 3) return;

        try {

            const response = await api.get('/cards/search?q=' + search);
            const data = validadeJson(response.data);
            
            setTotal(Math.floor(data.length / 4));
            setPage(1);
            setDocs(data);

        } catch (error) {
            console.log(error.message);
        }
        }

        async function refreshList() {
            setRefreshing(true);

            await loadPage(1, true);

            setRefreshing(false);
        }

        const handleViewableChanged = useCallback(({ changed }) => {
                try {
                    setViewable(changed.map(({ item }) => item._id));

                } catch (error) {
                    console.log(error);
                }
        
        }, []);

        function onFocus() {
            Animated.parallel([
                Animated.timing(inputLength, {
                    toValue: SEARCH_SHRINK_WIDTH,
                    duration: 250
                }),
                Animated.timing(cancelPosition, {
                    toValue: 16,
                    duration: 400
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 250
                })
            ]).start();
        }

        function onBlur() {
            Animated.parallel([
                Animated.timing(inputLength, {
                    toValue: SEARCH_FULL_WIDTH,
                    duration: 250
                }),
                Animated.timing(cancelPosition, {
                    toValue: 0,
                    duration: 250
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 250
                })
            ]).start();
        }
        
    return (
        <View>
            <View style={styles.Search}>
                        <Animated.View
                            style={[
                                styles.AnimatedSearch,
                                {
                                    width: inputLength,
                                    position: "absolute",
                                    left: 16,
                                    alignSelf: "center"
                                },
                                searchBarFocused === true ? undefined : { justifyContent: "center" }
                            ]}
                        >
                            <TextInput
                                style={styles.searchInput}
                                onBlur={onBlur}
                                onFocus={onFocus}
                                onChangeText={search.bind(this)}
                                placeholder="Search..."
                            />
                        </Animated.View>

                        <AnimatedTouchable
                            style={[styles.cancelSearch, { right: cancelPosition }]}
                            onPress={() => null}>

                            <Animated.Text
                                style={[styles.cancelSearchText, { opacity: opacity }]}>
                            </Animated.Text>

                        </AnimatedTouchable>
                    </View>

               <FlatList
                    key="list"
                    data={docs}
                    keyExtractor={item => String(item._id)}
                    onViewableItemsChanged={handleViewableChanged}
                    viewabilityConfig={{
                        viewAreaCoveragePercentThreshold: 50,
                    }}
                    showsVerticalScrollIndicator={false}
                    onRefresh={refreshList}
                    refreshing={refreshing}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => loadPage()}
                    renderItem={({ item }) => (
                
                    <View style={styles.Post}>
                        <Post>
                            <Header>
                                <Avatar source={{ uri: item.url }} />
                                <Name>{item.title}</Name>
                            </Header>
                            <LazyImage 
                                aspectRatio={0.834}
                                shouldLoad={viewable.includes(item._id)}
                                smallSource={{ uri: item.url }}
                                source={{ uri: item.url }}
                            />   
                                <Description>
                                    <Text>{item.description}</Text>
                                </Description>

                             <View>
                                    <TouchableOpacity  
                                        style={styles.Button} onPress={() => {  }}> 
                                        <Text style={styles.ButtonText}>ADD DECK</Text>
                                    </TouchableOpacity>
                            </View>
                        </Post>
                        </View>
                )}
            />
            </View>
    );
}
var React = require('react-native');
var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    borderColor:'#DA552F',
    borderRadius: 6,
  },

  Search: {
    flexDirection: "row",
    height: 50,
    borderBottomColor: "#fff",
    paddingTop: 50,
  },

  Post: {
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    flex: 1,
    marginBottom: 20,
    backgroundColor:'#f8f8ff'
  },

  
  search: {
    flex: 1,
    flexDirection: "row",
    height: 40,
    borderRadius: 6,
    backgroundColor: "red"
  },
  cancelSearch: {
    position: "absolute",
    marginHorizontal: 16,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center"
  },

  list: {
    padding: 20,
  },

  Button: {
    height: 42,
    backgroundColor: '#6699ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

   ButtonText: {
    fontSize: 16,
    color: '#fff'
  },

 
});
// The name we use in "index.html"
const app = angular.module('BookmarkApp', []);

app.controller('BookmarkController', [ '$http', function($http) {

    this.indexOfBookmarkToEdit = null;

    this.createBookmark = function() {
        console.log('Inside createBookmark');

        $http({
            method:'POST',
            url: '/bookmarks',
            data: {
                title: this.title,
                url: this.url,
            }
        }).then( (response) => {
            console.log(response);
            this.listBookmarks();
            // Clears out newly added website from input form fields
            this.title = '';
            this.url = '';
        }, (error) => {
            console.log('error');
        });
    };

    this.editBookmark = function(bookmark) {
        console.log('Inside editBookmark');
        // console.log('bookmark: ', bookmark);

        $http({
            method:'PUT',
            url: '/bookmarks/' + bookmark._id,
            data: {
                title: bookmark.newTitle,
                url: bookmark.newUrl,
            }
        }).then( (response) => {
            console.log('Edit response: ', response.data);
            this.listBookmarks();
            // Hide "Edit" and "Delete" buttons after clicking on "Edit" and
            // indicate which bookmark to edit
            this.indexOfBookmarkToEdit = null;
        }, (error) => {
            console.log('error');
        });
    };

    this.deleteBookmark = function(id) {
        console.log('Inside deleteBookmark');
        // console.log('_id: ', id);

        $http({
            method:'DELETE',
            url: '/bookmarks/' + id,
        }).then( (response) => {
            console.log(response.data);
            this.listBookmarks();
        }, (error) => {
            console.log('error');
        });
    };

    this.listBookmarks = function() {
        console.log('Inside listBookmarks');
        this.allBookmarks = [];

        $http({
            method:'GET',
            url: '/bookmarks',
        }).then( (response) => {
            console.log(response.data);
            // Capture all bookmarks for display in index.html
            this.allBookmarks = response.data;
        }, (error) => {
            console.log('error');
        });
    };
    // Initially display all bookmarks when page is opened
    this.listBookmarks();
}]);

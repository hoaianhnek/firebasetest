var ui = new firebaseui.auth.AuthUI(firebase.auth());
//Giao diện xác thực
var app = angular.module('MyApp',[]);
app.controller('myController',function($scope) {
    var uiConfig={
        signInOptions : [{
            // List of OAuth providers supported.
            provider: Ơfirebase.auth.PhoneAuthProvider.PROVIDER_ID,
            recaptchaParameters: { 
                type: 'image', // 'audio'
                size: 'normal', // 'invisible' or 'compact'
                badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
            },
            defaultCountry: 'VN'//đặt quốc gia mặc địn
                // uiShown: function() {
                //     // tiện ích được kết xuất
                //     // Ẩn bộ nạp
                //     document.getElementById('loader').style.display = 'none';
                // }
        }],
        callbacks: {
            signInSuccessWithAuthResult: function(user,credential, redirectUrl) {
                handleSignedInUser(user.user);
                // //người dùng đăng nhập thành công
                return false;//tiếp tục chuyển hướng trang
                //giao việc cho nhà phát triển xử  lý
            }
        },
        signInFlow:'popup'
    };
    var handleSignedInUser = function(user) {

        document.getElementById('user-signed-in').style.display = 'block';
        document.getElementById('user-signed-out').style.display = 'none';
        document.getElementById('phone').textContent = user.phoneNumber;
    };

    var handleSignedOutUser = function() {
        document.getElementById('user-signed-in').style.display = 'none';
        document.getElementById('user-signed-out').style.display = 'block';
        ui.start('#firebaseui-container', uiConfig);
    };
    firebase.auth().onAuthStateChanged(function(user) {
        console.log('user----', user)
        document.getElementById('loading').style.display = 'none';
        document.getElementById('loaded').style.display = 'block';
        user ? handleSignedInUser(user) : handleSignedOutUser();
    });
    var deleteAccount = function() {
        firebase.auth().currentUser.delete().catch(function(error) {
            if (error.code == 'auth/requires-recent-login') {
                // The user's credential is too old. She needs to sign in again.
                firebase.auth().signOut().then(function() {
                    // The timeout allows the message to be displayed after the UI has
                    // changed to the signed out state.
                    setTimeout(function() {
                        alert('Please sign in again to delete your account.');
                    }, 1);
                });
            }
        });
    };
    var initApp = function() {
        document.getElementById('sign-out').addEventListener('click', function() {
            firebase.auth().signOut();
        });
        document.getElementById('delete-account').addEventListener('click', function() {
                deleteAccount();
        });
    };

    window.addEventListener('load', initApp);

});
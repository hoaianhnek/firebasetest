
var ui = new firebaseui.auth.AuthUI(firebase.auth());
//Giao diện xác thực
var app = angular.module('MyApp',[]);
app.controller('myController',function($scope) {
    ui.start('#firebaseui-container', {
        signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions : [{
            // List of OAuth providers supported.
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            recaptchaParameters: { 
                type: 'image', // 'audio'
                size: 'normal', // 'invisible' or 'compact'
                badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
            },
            defaultCountry: 'VN',//đặt quốc gia mặc định
            // callbacks: {
            //     signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            //         var name = authResult.name;
            //         //người dùng đăng nhập thành công
            //         return true;//tiếp tục chuyển hướng trang
            //         //giao việc cho nhà phát triển xử  lý
            //     },
            //     uiShown: function() {
            //         // tiện ích được kết xuất
            //         // Ẩn bộ nạp
            //         document.getElementById('loader').style.display = 'none';
            //     }
            // },
            //sử dụng cửa sổ bật lên cho luồng đăng nhập của NCC thay vì chuyển hướng mặc định
            signInFlow: 'popup',
            signInSuccessUrl:'<url-to-redirect-to-on-success>',
            // signInOptions: [
            //     // để nguyên dòng cho các nhà cung cấp
            //     firebase.auth.PhoneAuthProvider.PROVIDER_ID
            // ],
            //url điều khoảng dịch vụ
            tosUrl:'<your-tos-url>',
            //url chính sách bảo mật
            privacyPolicyUrl:'<your-privacy-policy-url>',
            
        }]
    });
    firebase.auth().languageCode = 'it';
    var phoneNumber  = "0376206101";
    firebase.auth().signInWithPhoneNumber(phoneNumber,appVerifier)
        .then(function(confirmationResult) {
            window.confirmationResult = confirmationResult;
        }).catch(function(error) {
            alert("error");
        });
    
});




var appKey    = "36a464959db88029ccbb0d7fff8550a93ca8357b47cffa9492997d6da0ab2ee0";
var clientKey = "d0a4e48380efe629d4926e9f076e0ef5514502b995e4ef5310f1e2f03d8f32da";
var ncmb = new NCMB(appKey, clientKey);

///// Called when app launch
$(function() {
  $("#LoginBtn").click(onLoginBtn);
  $("#RegisterBtn").click(onRegisterBtn);
  $("#YesBtn_logout").click(onLogoutBtn);
});

//----------------------------------USER MANAGEMENT-------------------------------------//
var currentLoginUser; //現在ログイン中ユーザー

function onRegisterBtn()
{
//入力フォームからusername, password変数にセット
var username = $("#reg_username").val();
var password = $("#reg_password").val();
var number = $("#reg_number").val();

var user = new ncmb.User();
user.set("userName", username)
    .set("password", password)
    .set("number", number);

// 任意フィールドに値を追加
user.signUpByAccount()
    .then(function(user) {
        alert("新規登録に成功");
        currentLoginUser = ncmb.User.getCurrentUser();
        $.mobile.changePage('#DetailPage');
    })
    .catch(function(error) {
        alert("新規登録に失敗！次のエラー発生：" + error);
    });
}

function onLoginBtn()
{
    var username = $("#login_username").val();
    var password = $("#login_password").val();
    // ユーザー名とパスワードでログイン
    ncmb.User.login(username, password)
        .then(function(user) {
            alert("ログイン成功");
            currentLoginUser = ncmb.User.getCurrentUser();
            $.mobile.changePage('#DetailPage');
        })
        .catch(function(error) {
            alert("ログイン失敗！次のエラー発生: " + error);
        });
}

function onLogoutBtn()
{
    ncmb.User.logout();
    alert('ログアウト成功');
    currentLoginUser = null;
    $.mobile.changePage('#LoginPage');
}

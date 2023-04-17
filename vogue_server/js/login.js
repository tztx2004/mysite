// 보그 PJ : 로그인 페이지 JS - login.js

$(()=>{ /////////////////// jQB ////////////////////////
    console.log("로그인 로딩완료");

    /******************************************
        로그인 페이지 유효성검사하기
    ******************************************/
    // 대상 : #mid, #mpw
    const mid = $("#mid");
    const mpw = $("#mpw");
    
    // 유효성검사 기준 : 전송 시 아이디, 비번 모두 빈값없이 없어야함

    // 이벤트 대상 : #sbtn
    // 이벤트 종류 : click
    $("#sbtn").click(function(){
        // 기본이동 막기(서브밋 기능막기!)
        event.preventDefault();

        // 공백데이터 처리하기
        const groSpace = val => val.replace(/\s/g,"");


        // 유효성 검사하기
        // 아이디 비번 중 하나라도 비어 있으면 불통과!
        if(mid.val().trim() === "" || mpw.val().trim() === ""){
            alert("아이디,비밀번호 모두 입력하세요!");
            // 초기화 + 아이디에 포커스
            mid.val("").focus();
            mpw.val("");
        } //// if : 불통과 시 //////
        else{ // 통과 시 ////
            // 원래는 DB에서 조회된 결과를 받고
            // 성공메시지를 보이거나 첫페이지로
            // 보내준다!
            // alert("로그인에 성공하셨습니다!");

            // DB조회 페이지를 호출하여 결과를 받아서 처리함!
            // Ajax의 post()메서드 사용!
            // $.post(URL,data,callback)
            $.post(
                // 1. 전송할 페이지
                "./process/loginSet.php",
                // 2. 전송할 데이터
                {
                    "mid":$("#mid").val(), // 아이디
                    "mpw":$("#mpw").val(), // 비번
                },
                // 3. 결과처리함수(callback)
                function(res){ // res 결과값 전달변수
                    console.log("결과값",res);
                    // 3-1. 로그인 성공 시 : ok
                    if(res ==="ok"){
                        alert("로그인에 성공하셨습니다!");
                        // 메인페이지로 이동하기
                        location.href = "index.php";
                    }/////////// if /////////////

                    // 3-2. 비밀번호 틀린경우 : again
                    else if(res === "again"){ // 에러발생 시 ///
                        alert("비밀번호를 일치하지않습니다.");
                        // 비밀번호 지우고 비번에 포커스
                        mpw.val("").focus();
                    }/////////// else if /////////////

                    // 3-3. 아이디가 없는경우 : no
                    else if(res === "no"){
                        alert("사용가능한 ID가 아닙니다!");
                        // 초기화 + 아이디에 포커스
                        mid.val("").focus();
                        mpw.val("");
                    } //////////// else if ///////////

                }
            );////////////////// post ///////////////////

            /***************************************************
            
                [ 로그인 성공 후 어떤일이 일어나나? ]
                1. 로그인이 성공하면 서버에 사용자로그인 정보를
                기록한다. 이것이 세션이라고 불리는 메모리공간이다.
                
                2. 이 세션에 변수를 할당하여 필요한 사용자 정보를
                로그인 시간동안 유지하여 사용한다!
                -> 이것을 세션변수라고 함!
                -> 이것때문에 로그인 상태가 유지되어 시스템을
                    편리하게 이용할 수 있다!

                3. 세션의 기본 유지설정시간은 20분이다.
                만약 20분동안 세션의 갱신이 없으면(웹요청이 없으면)
                이를 만료로 처리하여 세션을 지운다!(자동로그아웃!)
                
            ***************************************************/

            
        }///////// else : 통과시 ////////////
        
    });//////////////////// click /////////////////////
    
    

});//////////////////////// jQB /////////////////////////////
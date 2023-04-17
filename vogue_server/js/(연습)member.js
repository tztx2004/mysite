$(()=>{////////////////// jQB ///////////////////////
    console.log("연습!");

    $(`input[type=text][id!=email2][class!=search],
    input[type=password]`)
    .blur(function(){
        // 0. 공백제거처리함수
        const groSpace = x => x.replace(/\s/g,"");

        // 1. 방금 블러가 발생한 요소의 id는?
        let cid = $(this).attr("id");

        // 2. 블러가 발생한 요소의 입력값은?
        let cv = cid === "mnm"?
        $(this).val().trim():groSpace($(this).val());

        // 서비스 차원, 데이터 원래 입력창에 넣어주기
        $(this).val(cv);
        console.log(cid,cv);

        /* 
            3. 빈값 여부 검사하기
        */

        if(cv === ""){
            // 메시지 출력
            $(this).siblings(".msg").html("필수입력")
            .removeClass("on");

            // 불통과
            pass = false;
        }
        /* 
            4. 아이디일 경우 유효성검사
        */
        else if(cid === "mid"){
            if(!vReg(cv,cid)){ // 불통과 시
                $(this).siblings(".msg")
                .text("영문자로 시작하는 6~20글자 영문자/숫자")
                .removeClass("on")

                // 불통과
                pass = false;
            }/////////////////// if ///////////////////
            else { // 통과 시
                // 1. DB에 아이디가 있는 지 조회 후 결과로 처리해야함!(보류)

                // 2. 메시지 띄우기
                $(this).siblings(".msg")
                .text("Good ID~").addClass("on");
            }////////////////// else /////////////////
        }/////////////// else if:아이디검사 시 ////////////////////

        /* 5. 비밀번호일 경우 유효성검사 */
        else if(cid === "mpw"){
            console.log("비밀번호검사결과:",vReg(cv,cid));
            if(!vReg(cv,cid)){ // 불통과 시
                $(this).siblings(".msg")
                .text("특수문자,문자,숫자 포함 형태의 5~15자리")
                .removeClass("on");

                // 불통과
                pass = false;
            }//////////////// if ////////////////////
            else{//통과시
                // 메시지 지우기
                $(this).siblings(".msg").empty();
            }/////////////// else ////////////////
        }////////////////// else if : 비밀번호 검사 시 //////////////
        
        /* 6. 비밀번호확인일 경우 유효성검사 */
        else if(cid === "mpw2"){
            if(cv !== $("#mpw").val()){ // 비밀번호와 같지 않으면
                $(this).siblings(".msg")
                .text("비밀번호가 일치하지않습니다.")
                .removeClass("on");

                // 불통과
                pass = false;
            }//////////////// if ////////////////////
            else{//통과시
                // 메시지 지우기
                $(this).siblings(".msg").empty();
            }/////////////// else ////////////////
        }////////////////// else if : 비밀번호확인 검사 시 //////////////

        /* 7. 이메일 유효성검사 */
        else if(cid === "email1"){
            // 1. 이메일 주소 만들기 : 앞주소@뒷주소
            let comp = eml1.val() + "@" +
            (seleml.val() === "free"?eml2.val():seleml.val());

            // 2. 이메일 검사함수 호출하기
            resEml(comp);

        }///////////////////// else if: 이메일검사 //////////////
        else {
            $(this).siblings(".msg").empty();
        }////////////// else ///////////////////

    });////////////blur///////////////////////

    /////////// 이메일 관련 대상선정 /////////////
    // 이메일 앞주소
    const eml1 = $("#email1");
    // 이메일 뒷주소
    const eml2 = $("#email2");
    // 이메일 선택박스
    const seleml = $("#seleml");
    //////////////////////////////////////////////

    /* 선택박스 변경 시 이메일 검사 */

    seleml.change(function(){

        // 1. 선택박스 변경된 값 읽어오기
        let cv = $(this).val();
        console.log("선택값:",cv);

        // 2. 선택옵션별 분기문
        if(cv === "init"){
            // 1. 메시지출력
            eml1.siblings(".msg")
            .text("이메일 옵션 선택필수")
            .removeClass("on");

            // 2. 직접 입력창 숨기기
            eml2.fadeOut(300);
        }//////////////if : 선택해주세요 ////////////
        else if(cv === "free"){

            // 1. 직접입력창 보이기
            eml2.fadeIn(300).val("").focus();

            // 2. 기존 메시지 지우기
            eml1.siblings(".msg").empty();
        }////////////// else if: 직접입력 /////////////
        else{// 이메일 주소일 경우
            // 1. 직접 입력창 숨기기
            eml2.fadeOut(300);

            // 2. 이메일 전체 주소 조합하기
            let comp = eml1.val() + "@" + cv;
            // cv는 select의 option의 value값

            // 3. 이메일 유효성 검사함수 호출
            resEml(comp);
        }//////////// else : 이메일 주소 ///////////
        
    }); ///////////// change ///////////////////

    /* 키보드 입력 시 이메일 체크 */

    $("#email1,#email2").on("keyup",function(){

        // 1. 현재 이벤트 대상 아이디 읽어오기
        let cid = $(this).attr("id");
        
        // 2. 현재 입력된 값 읽어오기
        let cv = $(this).val();
        console.log("입력아이디:",cid,"\n입력값:",cv);

        // 3. 이메일 뒷주소 셋팅하기
        let backeml = 
        cid === "email1"? seleml.val(): eml2.val();

        // 4. 만약 선택박스값이 "free"(직접입력)이면
        // 이메일 뒷주소로 변경함!
        if(seleml.val() === "free") backeml = eml2.val();

        // 5. 이메일 전체주소 조합하기
        let comp = eml1.val() + "@" + backeml;

        // 6. 이메일 유효성 검사함수 호출
        resEml(comp);

    }); /////////////////// keyup //////////////////


    /* resEml */
    const resEml = (comp) => {
        console.log("이메일 주소:",comp);
        console.log("검사결과:",vReg(comp,"eml"));

        // 이메일 정규검사식에 따른 메시지 보이기
        if(vReg(comp,"eml")){
            eml1.siblings(".msg")
            .text("적합한 이메일 형식입니다.")
            .addClass("on");
        }///////////// if 통과시 /////////////////
        else{
            eml1.siblings(".msg")
            .text("맞지않는 이메일 형식입니다.")
            .removeClass("on");

            // 불통과
            pass = false;
        }/////////////// else 불통과 시 ///////////////
    }; ////////////// resEml ///////////////////


    /* submit 처리 */
    // 검사용 변수
    let pass = true;

    // 이벤트 대상 : #btnj

    $("#btnj").click(e=>{
        console.log("가입해!");

        // 1. 기본이동막기
        e.preventDefault();

        // 2. pass 통과여부 변수에 true를 할당
        pass = true;

        // 3. 입력창 blur이벤트 강제발생
        // 대상 : 블러 이벤트 발생했던 요소들!
        $(`input[type=text][id!=email2][class!=search],
        input[type=password]`)
        .trigger("blur");

        // 최종통과 여부
        console.log("통과여부:",pass);

        // 4. 검사결과에 다라 메세지 보이기
        if(pass){
            alert("회원가입을 축하드립니다");

            location.href = "login.html";

            location.replace("login.com");

        }///////////// if 통과시/////////////////
        else{
            alert("입력을 수정하세요")
        }/////////////// else : 불통과 시 /////////////////////

    })///////////////// click ///////////////


    /**********************************************
        함수명 : vReg(validation with Regular Expression)
        기능 : 값에 맞는 형식을 검사하며 리턴함
    **********************************************/
    function vReg(val,cid){
        // val - 검사할 값, cid - 처리구분아이디
        // 정규식 변수
        let reg;

        // 검사할 아이디에 따라 정규식을 변경함
        switch (cid) {
            case "mid":
                reg = /^[a-z]{1}[a-z0-9]{5,19}$/g;
                break;
            case "mpw":
                reg = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
                break;
            case "eml":
                reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
                break;
        }//////////////// switch case /////////////////

        // -> 정규식.text(검사할 값) : 결과 true/false
        return reg.test(val);// 호출한 곳으로 검사결과 리턴
    } //////////////// vReg //////////////////
    

});/////////////////////// jQB //////////////////////////////
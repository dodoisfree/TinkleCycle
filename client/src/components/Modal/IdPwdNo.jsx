/**
 * @file: IdPwdNo.jsx
 * @description: Modal - 아이디 또는 비밀번호가 잘못되었습니다
 * @author: 천경재
 */

import React, { memo } from 'react';
import '../../assets/scss/okModal.scss'

const IdPwdNo = memo(({modal, setModal}) => {
    const onModalClose = React.useCallback(() => {
        setModal(false);
    },[setModal]);

    return (
        <>
            {modal && 
                <div className="modalWrap">
                <div className="modalInner">
                    <div className="textWrap">
                        <p>아이디 또는 비밀번호가 잘못되었습니다.</p>
                    </div>
                    <button onClick={onModalClose}>확인</button>
                </div>
            </div>
            }
        </>
    );
});
 
export default IdPwdNo;
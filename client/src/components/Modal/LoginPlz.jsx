/**
 * @file: LoginPlz.jsx
 * @description: Modal - 로그인이 필요합니다
 * @author: 천경재
 */

import React, { memo } from 'react';
import '../../assets/scss/okModal.scss'

const LoginPlz = memo(({modal, setModal}) => {
    const onModalClose = React.useCallback(() => {
        setModal(false);
    },[setModal]);

    return (
         <>
            {modal && 
                <div className="modalWrap">
                <div className="modalInner">
                    <div className="textWrap">
                        <p>로그인이 필요합니다.</p>
                    </div>
                    <button onClick={onModalClose}>확인</button>
                </div>
            </div>
            }
        </>
    );
});
 
export default LoginPlz;
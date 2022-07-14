/**
 * @file: PwdChange.jsx
 * @description: Modal - 비밀번호 변경이 완료되었습니다
 * @author: 천경재
 */

import React, { memo } from 'react';
import '../../assets/scss/okModal.scss'

const PwdChange = memo(({modal, setModal}) => {
    const onModalClose = React.useCallback(() => {
        setModal(false);
    },[setModal]);

    return (
        <>
            {modal && 
                <div className="modalWrap">
                <div className="modalInner">
                    <div className="textWrap">
                        <p>비밀번호 변경이 완료되었습니다.</p>
                    </div>
                    <button onClick={onModalClose}>확인</button>
                </div>
            </div>
            }
        </>
    );
});
 
export default PwdChange;
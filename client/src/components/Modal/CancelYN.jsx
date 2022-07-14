/**
 * @file: CancleYN.jsx
 * @description: Modal - 정말 취소하시겠습니까?
 * @author: 천경재
 */

import React, { memo } from 'react';

const CancleYN = memo(({modal, setModal}) => {
    const onModalNo = React.useCallback(() => {
        setModal(false);
    },[setModal]);
    return (
        <>
            {modal && 
                <div className="modalWrap">
                <div className="modalInner">
                    <div className="textWrap">
                        <p>정말 취소하시겠습니까?</p>
                    </div>
                    <button onClick={onModalNo}>아니요</button>
                    <button>예</button>
                </div>
            </div>
            }
        </>
    );
});
 
export default CancleYN;
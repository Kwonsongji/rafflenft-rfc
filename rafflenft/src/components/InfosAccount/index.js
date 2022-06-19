import React, {useState, useEffect} from 'react'

const InfosAccount = (props) => {

  return (
    <div className=''>
       {!props.loader &&
          props.accounts.length > 0 ?
        <div>
          <p> You are connected with this account : {props.accounts[0]} </p>
          {props.balance && <p> You have {props.balance} Eth on your account </p>}
          {props.balance < 0.3 && <p className="infos"> You don't have enough ETH on your account to go on our whitelist </p>}
        </div>

    
        :
        <p> You are not connected with Metamask to this website.</p>
      }
    </div>
  )
}

export default InfosAccount;
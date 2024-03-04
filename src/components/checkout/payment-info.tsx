import { useRef, useEffect, useState } from "react"

export default function PaymentInfo({ markup, onMsaxCcResult, isOkToCheckout, refFromChild, handleCheckout }) {
  const submitRef = useRef();
  // we need serviceAccountId for the checkout payload for 
    const iframeRef = useRef(null)
    const [isValid, setIsValid] = useState(false)
    // const [cardTokenAndId, setCardTokenAndId]  = useState(null)
    // const [cardType, setCardType] = useState(null)

    useEffect(() => {
      refFromChild(submitRef)
    }, [refFromChild])

    function iframeEventListener(event) {
        console.log('event', event)
        if (typeof event.data !== 'string') {
            return
        }
        // turn that string back into an object
        const dataAsObject = JSON.parse(event.data)
        //event should have data property with a value like 
        // {"id": "136e9c86-31a1-4177-b2b7-a027c63edbe0","type": "usaEpayValid", "value": "eyJVU0FlUEF5VmFsaWQiOnRydWV9"}
        // console.log('Event into iframeEventListener', event)

        const { type, value } = dataAsObject
        
        if (type === 'usaEpayValid') {
          setIsValid(true)
        }

        if (type === 'msax-cc-result') {
          //const decoded = atob(value) // move this to parent
          onMsaxCcResult(value)
        }

        // const data = JSON.parse(event.data)
        // if (data.type === 'usaEpayValid' || data.type === 'cvvChanged') {
        //     console.log('running')
        //     setCardTokenAndId({id: data.id, token: data.value})
        // }
        // on a CC change even we can see data is 'ccTypeChanged::discover', so we can get card name
        // the token data.value might be JSON.parse(atob(result?.value)
        // there must be an event for a card prefix
        // D365 has logic like
        // when we see usaEpayValid in data, we enable submit button
        // there will be a message 'msax-cc-result' which will have the btoa encoded card info
    }

    function tellIframeToSubmit(event) {
      iframeRef.current.contentWindow.postMessage(JSON.stringify({type: 'msax-cc-submit',value: 'true'}),'*')
      // it will then post a result like "{\"id\":\"136e9c86-31a1-4177-b2b7-a027c63edbe0\",\"type\":\"msax-cc-result\",\"value\":\"eyJ0eXBlIjoicGF5bWVudF9rZXkiLCJrZXkiOiJqTFZEcHhYcDFxZ1FaSjF3YVNwQjREIiwiY3JlZGl0Y2FyZCI6eyJudW1iZXIiOiI2MDExMjJ4eHh4eHgyMjI0IiwiY2FyZHR5cGUiOiJEaXNjb3ZlciJ9fQ==\"}"
      // when you decode atob you will see { "type": "payment_key","key": "jLVDpxXp1qgQZJ1waSpB4D","creditcard": {"number": "601122xxxxxx2224","cardtype": "Discover"}}
    }

    useEffect(()=>{
        iframeRef && iframeRef.current.contentDocument.open()
        iframeRef.current.contentDocument.write(markup)
        window.addEventListener('message', iframeEventListener)

        // cleanup
        return () => window.removeEventListener('message', iframeEventListener)
    },[])



  return (
    <div>
      <h1>Payment Info</h1>
      <iframe ref={iframeRef} sandbox="allow-scripts allow-forms allow-same-origin allow-popups" src=""></iframe>
      {/* instead of this button, you would validate what the ifrae has told us so far, then call the tellIframeToSubmit function */}
      <button onClick={tellIframeToSubmit} className="mt-4 px-4 py-2 font-semibold text-sm bg-amber-500 text-white rounded-md shadow-sm opacity-100">Tell iframe to submit</button>
      { isOkToCheckout && <p>O.K. to checkout</p> }
      <button type="button" ref={submitRef} className="hidden" onClick={handleCheckout}>Submit</button>
    </div>
  )
}

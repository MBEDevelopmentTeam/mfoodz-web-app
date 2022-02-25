<div className="trackingPanelFrame">
  <div className="trackPanel1">
    <div className="finalOrderList">
      <h3 className="storename">{storeName}</h3>

      <Scrollbars>
        {orderItems.map((item) => {
          return (
            <ul className="listul" key={item.OrderId}>
              <li className="listli1">{`${item.Quantity} x`}</li>

              <li className="listli2">{item.Name}</li>
            </ul>
          );
        })}
      </Scrollbars>
    </div>
  </div>

  <div className="trackPanel2">
    <div
      style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        marginTop: "-3px",
        textAlign: "center",
      }}
    >
      <OrderStatusBox OrderStatusName={OrderStatusName} />
      <p>Order-No: {OrderNo}</p>
    </div>

    {/********************** chat support panel is below ***********************/}

    {orderStatus == 3 ? (
      <div className="contactless">
        {chatStatusIcon == false ? (
          <>
            {chatNumber > 0 ? (
              <div className="chatNumber">{chatNumber}</div>
            ) : null}
          </>
        ) : null}

        <p style={{ color: "black", alignItems: "center" }}>
          Ask your rider for
          <br /> contactless delivery
        </p>

        <span
          className="messageIcon"
          onClick={() => (
            dispatch(chatIconStatus()), dispatch(chatNumberNULL())
          )}
        >
          <img
            style={{
              width: "50px",
              marginTop: "3px",
            }}
            src={messageicon}
          />
        </span>
      </div>
    ) : (
      <div className="contactless"></div>
    )}

    <div className="mdline"></div>

    <div className="needhelp">
      <h2 className="NS" style={{ fontWeight: "600" }}>
        NEED SUPPORT?
      </h2>

      <h3 className="QRO">
        Questions regarding your order?
        <br /> Reach out to us.
      </h3>

      <button className="btnContact"> (+1)855556-7433</button>
    </div>
  </div>
</div>;



// lkasjdlkaslaksdjsjd




<div className="trackingPanelFrame">
<div className="trackPanel1">
  <div
    style={{
      flex: "1",
      display: "flex",
      flexDirection: "column",
      marginTop: "-3px",
      textAlign: "center",
    }}
  >
    <OrderStatusBox OrderStatusName={OrderStatusName} />
    <p>Order-No: {OrderNo}</p>
  </div>

  {/********************** chat support panel is below ***********************/}

  {orderStatus == 3 ? (
    <div className="contactless">
      {chatStatusIcon == false ? (
        <>
          {chatNumber > 0 ? (
            <div className="chatNumber">{chatNumber}</div>
          ) : null}
        </>
      ) : null}

      <p style={{ color: "black", alignItems: "center" }}>
        Ask your rider for
        <br /> contactless delivery
      </p>

      <span
        className="messageIcon"
        onClick={() => (
          dispatch(chatIconStatus()), dispatch(chatNumberNULL())
        )}
      >
        <img
          style={{
            width: "50px",
            marginTop: "3px",
          }}
          src={messageicon}
        />
      </span>
    </div>
  ) : (
    <div className="contactless"></div>
  )}
</div>

<div className="trackPanel2">
  <div className="finalOrderList">
    <h3 className="storename">{storeName}</h3>

    <Scrollbars>
      {orderItems.map((item) => {
        return (
          <ul className="listul" key={item.OrderId}>
            <li className="listli1">{`${item.Quantity} x`}</li>

            <li className="listli2">{item.Name}</li>
          </ul>
        );
      })}
    </Scrollbars>
  </div>

  <div className="mdline"></div>

  <div className="needhelp">
    <h2 className="NS" style={{ fontWeight: "600" }}>
      NEED SUPPORT?
    </h2>

    <h3 className="QRO">
      Questions regarding your order?
      <br /> Reach out to us.
    </h3>

    <button className="btnContact"> (+1)855556-7433</button>
  </div>
</div>
</div>



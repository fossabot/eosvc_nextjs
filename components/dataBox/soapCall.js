const axios = require("axios");

const getMessageList = async () => {
  try {
    // Nastavíme hlavičky požadavku
    const headers = {
      "Content-Type": "application/soap+xml;charset=UTF-8",
      Accept: "application/soap+xml",
    };

    // Sestavíme tělo požadavku ve formátu SOAP
    const data = `
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"
                  xmlns:ds="http://www.w3.org/2000/09/xmldsig#"
                  xmlns:pki="http://www.cesnet.cz/xml/dsig/pki">
      <soap:Header>
        <ds:Signature>
          <ds:SignedInfo>
            <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
            <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
            <ds:Reference URI="#body">
              <ds:Transforms>
                <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
              </ds:Transforms>
              <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
              <ds:DigestValue/>
            </ds:Reference>
          </ds:SignedInfo>
          <ds:SignatureValue/>
          <ds:KeyInfo>
            <ds:X509Data>
              <ds:X509Certificate></ds:X509Certificate>
            </ds:X509Data>
          </ds:KeyInfo>
        </ds:Signature>
        <pki:TimeStamp TokenId="timestamp"/>
      </soap:Header>
      <soap:Body xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"
                 wsu:Id="body">
        <pki:GetMessageList>
          <pki:InputMessage>
            <pki:PID>test</pki:PID>
            <pki:Auth>
              <pki:UserName>test</pki:UserName>
              <pki:Password>test123</pki:Password>
            </pki:Auth>
          </pki:InputMessage>
        </pki:GetMessageList>
      </soap:Body>
    </soap:Envelope>
  `;

    // Odešleme požadavek na API datových schránek pomocí funkce fetch
    const response = await fetch(
      "https://isds.czechpoint.cz/DataBox/services/REST/GetMessageList/v1",
      {
        method: "POST",
        headers: headers,
        body: data,
      }
    );

    // Zpracujeme odpověď
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

// Vyzkoušíme si volání funkce
getMessageList();

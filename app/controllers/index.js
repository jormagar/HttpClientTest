['simplePost', 'basicAuthPost'].forEach(function (proxy) {
  $.addListener($[proxy], 'click', prepareRequest);
});

$.index.open();

function prepareRequest(e) {
  var withCredentials = true;

  if (e.source.id === 'simplePost') {
    withCredentials = false;
  }

  console.log('WITH CREDENTIALS : ' + withCredentials);

  request(withCredentials);
}

function request(withCredentials) {
  var client,
    config,
    url,
    data,
    upv,
    expire;

  upv = true;
  expire = false;

  if (upv) {
    url = 'xxx';

    if (expire) {
      url = 'xxx';
    }

    data = {
      'grant_type': 'refresh_token',
      'UPV_UUID': 'xxx',
      'refresh_token': 'xxx'
    };
  } else {
    url = 'https://httpbin.org/post';

    data = {
      message: 'This is my message',
      from: 'Jorge'
    };
  }

  config = {
    onload: success,
    onerror: error,
    timeout: 5000
  };

  if (withCredentials) {
    config.withCredentials = true;
    config.username = 'VT11E41975F9CAEA3A106CC67167CEBC21';
    config.password = '58712C1C7624FBB2435E330AF5F74F76E905';
  }

  console.log('HTTP CLIENT CONFIG ' + JSON.stringify(config));

  client = Ti.Network.createHTTPClient(config);

  //client.abort();

  try {
    console.log('URL ' + url);

    client.open('POST', url);
  } catch (e) {
    alert('error opening client');
    console.log(JSON.stringify(e));
  }

  try {
    client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  } catch (e) {
    alert('error setting request headers');
    console.log(JSON.stringify(e));
  }

  try {
    client.send(data);
  } catch (e) {
    alert('error sending data');
    console.log(JSON.stringify(e));
  }
}

function success(e) {
  Ti.API.info('Received text: ' + this.responseText);
}

function error(e) {
  Ti.API.debug(e.error);
}

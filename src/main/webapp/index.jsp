<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
    <script type="text/javascript">
        function mostrarMensaje() {
            document.getElementById("mensaje").innerText = "Hello World!";
        }
    </script>
</head>
<body onload="mostrarMensaje()">
    <h1 id="mensaje"></h1>
</body>
</html>

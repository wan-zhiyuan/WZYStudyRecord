import 'package:flutter/material.dart';
import 'pages/launch_page.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return Container(
      child: MaterialApp(
        title: '爱杯商用四支装',
        debugShowCheckedModeBanner: false,//去除右上角debug
        theme: ThemeData(
          primaryColor: Colors.pink
        ),
        home: new LaunchPage(),
      ),
    );
  }
}


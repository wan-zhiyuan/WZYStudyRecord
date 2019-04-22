import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return Container(
      child: MaterialApp(
        title: '爱杯商用四支装',
        debugShowCheckedModeBanner: false,//去除右上角debug
        
      ),
    );
  }
}


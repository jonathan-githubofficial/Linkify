import 'package:flutter_test/flutter_test.dart'
import 'package:mockito/mockito.dart';

class MockUser extends Mock implements User {}

final MockUser _mockUser = MockUser();

class MockFirebaseAuth extends Mock implements FirebaseAuth {
  @override
  Stream<User> authStateChanges() {
    return Stream.fromIterable([
      _mockUser;
    ])
  }
}

void main() {
  setUp((){});
  tearDown(() {});
}
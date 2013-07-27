/*!
 * VerbalExpressions C++ Library v0.1
 * https://github.com/whackashoe/CppVerbalExpressions
 *
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013 whackashoe
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

#ifndef VERBAL_EXPRESSIONS_H_
#define VERBAL_EXPRESSIONS_H_

#define USE_BOOST

#ifdef USE_BOOST
#include <boost/regex.hpp>
namespace veregex = boost;
#else
#include <regex>
namespace veregex = std;
#endif

#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

class VerEx {
private:
    std::string prefixes;
    std::string source;
    std::string suffixes;
    std::string pattern;
    enum Flags { GLOBAL = 1,
                 MULTILINE = 2,
                 CASEINSENSITIVE = 4 };

    friend std::ostream& operator<<(std::ostream &strm, VerEx &v) {
        return strm << v.pattern;
    }

    unsigned int checkFlags() {
        unsigned int result = 0;
        if(modifiers & CASEINSENSITIVE) result |= veregex::regex::icase;
        return result;
    }

    const std::string reduceLines(const std::string & value) {
        std::string ret = value;
        std::size_t pos = ret.find("\n");
        if(pos == std::string::npos) return ret;
        return ret.substr(0, pos);
    }

public:
    unsigned int modifiers;

    VerEx() : prefixes(""), 
              source(""), 
              suffixes(""), 
              pattern(""), 
              modifiers(0){};
    VerEx& operator=(const VerEx& ve) = default;
    ~VerEx() = default;
    
    VerEx & add(const std::string & value) {
        source = source + value;
        pattern = prefixes + source + suffixes;
        return (*this);
    }

    VerEx & startOfLine(bool enable) {
        prefixes = enable ? "^" : "";
        return add("");
    }

    inline VerEx & startOfLine() {
        return startOfLine(true);
    }

    VerEx & endOfLine(bool enable) {
        suffixes = enable ? "$" : "";
        return add("");
    }

    inline VerEx & endOfLine() {
        return endOfLine(true);
    }

    VerEx & then(const std::string & value) {
        return add("(?:" + value + ")");
    }

    VerEx & find(const std::string & value) {
        return then(value);
    }

    VerEx & maybe(const std::string & value) {
        return add("(?:" + value + ")?");
    }

    VerEx & anything() {
        return add("(?:.*)");
    }

    VerEx & anythingBut(const std::string & value) {
        return add("(?:[^" + value + "]*)");
    }

    VerEx & something() {
        return add("(?:.+)");
    }

    VerEx & somethingBut(const std::string & value) {
        return add("(?:[^" + value + "]+)");
    }

    const std::string replace(const std::string & source, const std::string & value) {
        return veregex::regex_replace(  source,
                                        veregex::regex(pattern, checkFlags()), 
                                        value);
    }

    VerEx & lineBreak() {
        return add("(?:(?:\\n)|(?:\\r\\n))");
    }

    inline VerEx & br() {
        return lineBreak();
    }

    VerEx & tab() {
        return add("\\t");
    }

    VerEx & word() {
        return add("\\w+");
    }

    VerEx & anyOf(const std::string & value) {
        return add( "[" + value + "]" );
    }

    VerEx & any(const std::string & value) {
        return anyOf(value);
    }

    VerEx & range(std::vector<std::string> args) {
        std::stringstream value;
        value << "[";

        for(unsigned int _from = 0; _from < args.size(); _from += 2) {
            unsigned int _to = _from+1;
            if (args.size() <= _to) break;

            int from = atoi(args[_from].c_str());
            int to = atoi(args[_to].c_str());

            value << from << "-" << to;
        }

        value << "]";

        return add(value.str());
    }

    VerEx & addModifier(char modifier) {
        switch (modifier) {
            case 'i':
                modifiers |= CASEINSENSITIVE;
                break;
            case 'm':
                modifiers |= MULTILINE;
                break;
            case 'g':
                modifiers |= GLOBAL;
                break;
            default:
                break;
        }

        return (*this);
    }

    VerEx & removeModifier(char modifier) {
        switch (modifier) {
            case 'i':
                modifiers ^= CASEINSENSITIVE;
                break;
            case 'm':
                modifiers ^= MULTILINE;
                break;
            case 'g':
                modifiers ^= GLOBAL;
                break;
            default:
                break;
        }

        return (*this);
    }


    VerEx & withAnyCase(bool enable) {
        if (enable) addModifier( 'i' );
        else removeModifier( 'i' );
        return (*this);
    }

    inline VerEx & withAnyCase() {
        return withAnyCase(true);
    }

    VerEx & searchOneLine(bool enable) {
        if (enable) removeModifier( 'm' );
        else addModifier( 'm' );
        return (*this);
    }

    inline VerEx & searchOneLine() {
        return searchOneLine(true);
    }

    VerEx & searchGlobal(bool enable) {
        if (enable) addModifier( 'g' );
        else removeModifier( 'g' );
        return (*this);
    }

    inline VerEx & searchGlobal() {
        return searchGlobal(true);
    }

    VerEx & multiple(const std::string & value) {
        if(value.at(0) != '*' && value.at(0) != '+')
            add("+");

        return add(value);
    }

    VerEx & alt(const std::string & value) {
        if (prefixes.find("(") == std::string::npos) prefixes += "(";
        if (suffixes.find(")") == std::string::npos) suffixes = ")" + suffixes;

        add( ")|(" );
        return then(value);
    }

    bool test(const std::string & value) {
        std::string toTest;
        if(modifiers & MULTILINE) toTest = value;
        else                      toTest = reduceLines(value);

        if(modifiers & GLOBAL)
            return veregex::regex_search(toTest, veregex::regex(pattern, checkFlags()));        
        else
            return veregex::regex_match(toTest, veregex::regex(pattern, checkFlags()));
    }
};

#endif
